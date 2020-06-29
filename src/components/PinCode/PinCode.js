import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  containerDefault: {},
  cellDefault: {
    height: 33,
    width: 33,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#C9C9C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFocusedDefault: {
    borderColor: '#C9C9C9',
  },
  cellStyleFilledDefault: {
    borderColor: '#C9C9C9',
  },
  cellStyleErrordDefault: {
    borderColor: '#FE7A4C',
  },
  innerCellStyleDefault: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'transparent',
  },
  innerCellStyleFilledDefault: {
    borderColor: 'transparent',
  },
  innerCellStyleFilledDefault: {
    borderColor: Colors.breidholtAtNight,
    backgroundColor: Colors.breidholtAtNight,
  },
  textStyleDefault: {
    color: Colors.greenThunder,
    fontSize: 36,
  },
  textStyleFocusedDefault: {
    color: 'black',
  },
});

/**
 * @class PinCode
 * @augments {React.Component}
 */
class PinCode extends React.Component {
  static defaultProps = {
    value: '',
    codeLength: 4,
    cellSize: 48,
    cellSpacing: 12,
    placeholder: '',
    password: false,
    mask: '*',
    keyboardType: 'numeric',
    autoFocus: false,
    containerStyle: styles.containerDefault,
    cellStyle: styles.cellDefault,
    cellStyleFocused: styles.cellFocusedDefault,
    cellStyleFilled: styles.cellStyleFilledDefault,
    cellStyleError: styles.cellStyleErrordDefault,
    innerCellStyle: styles.innerCellStyleDefault,
    innerCellStyleFilled: styles.innerCellStyleFilledDefault,
    innerCellStyleFocused: styles.innerCellStyleFocusedDefault,
    textStyle: styles.textStyleDefault,
    textStyleFocused: styles.textStyleFocusedDefault,
    animationFocused: 'pulse',
    error: false,
  };

  state = {
    maskDelay: false,
    focused: false,
  };

  ref = React.createRef();

  inputRef = React.createRef();

  /**
   * @returns {undefined}
   */
  shake = () => {
    return this.ref.current.shake(650);
  };

  /**
   * @returns {undefined}
   */
  focus = () => {
    return this.inputRef.current.focus();
  };

  /**
   * @returns {undefined}
   */
  blur = () => {
    return this.inputRef.current.blur();
  };

  /**
   * @param {string} code
   * @returns {undefined}
   */
  inputCode = code => {
    const { onTextChange } = this.props;

    if (onTextChange) {
      onTextChange(code);
    }
  };

  /**
   * @param {*} event
   */
  keyPress = event => {
    if (event.nativeEvent.key === 'Backspace') {
      const { value, onBackspace } = this.props;
      if (value === '' && onBackspace) {
        onBackspace();
      }
    }
  };

  /**
   * @param {boolean} focused
   */
  onFocused = focused => {
    this.setState({ focused });
  };

  render() {
    const {
      value,
      codeLength,
      cellSize,
      cellSpacing,
      placeholder,
      password,
      mask,
      autoFocus,
      containerStyle,
      cellStyle,
      cellStyleFocused,
      cellStyleFilled,
      innerCellStyle,
      innerCellStyleFilled,
      innerCellStyleFocused,
      cellStyleError,
      textStyle,
      textStyleFocused,
      keyboardType,
      error,
    } = this.props;
    const { maskDelay, focused } = this.state;
    return (
      <View
        ref={this.ref}
        style={[
          {
            alignItems: 'stretch',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
            width: cellSize * codeLength + cellSpacing * (codeLength - 1),
            height: cellSize,
          },
          containerStyle,
        ]}
      >
        <View
          style={{
            position: 'absolute',
            margin: 0,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {Array(codeLength)
            .fill()
            .map((_, idx) => {
              const cellFocused = focused && idx === value.length;
              const filled = idx < value.length;
              const last = idx === value.length - 1;

              return (
                <View
                  key={idx} // eslint-disable-line react/no-array-index-key
                  style={{
                    width: cellSize,
                    height: cellSize,
                    marginLeft: cellSpacing / 2,
                    marginRight: cellSpacing / 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={[
                      cellStyle,
                      cellFocused ? cellStyleFocused : {},
                      filled ? cellStyleFilled : {},
                      error ? cellStyleError : {},
                    ]}
                  >
                    <View
                      style={[
                        innerCellStyle,
                        cellFocused ? innerCellStyleFocused : {},
                        filled ? innerCellStyleFilled : {},
                      ]}
                    />
                  </View>
                  {/* <Text
                    style={[
                      { position: 'absolute' },
                      textStyle,
                      cellFocused ? textStyleFocused : {},
                    ]}
                  >
                    {filled && password && (!maskDelay || !last)
                      ? mask
                      : value.charAt(idx)}
                    {!filled && placeholder}
                  </Text> */}
                </View>
              );
            })}
        </View>
        <TextInput
          value={value}
          ref={this.inputRef}
          onChangeText={this.inputCode}
          onKeyPress={this.keyPress}
          onFocus={() => this.onFocused(true)}
          onBlur={() => this.onFocused(false)}
          spellCheck={false}
          autoFocus={autoFocus}
          keyboardType="number-pad"
          returnKeyType="done"
          numberOfLines={1}
          maxLength={codeLength}
          selection={{
            start: value.length,
            end: value.length,
          }}
          style={{
            flex: 1,
            opacity: 0,
            textAlign: 'center',
          }}
        />
      </View>
    );
  }
}

export default PinCode;
