import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import * as ui from './styles';
import { CtaButton } from '../Button/Button';
import Colors from '../../constants/Colors';
import { deleteTestResults } from '../../api/User/user';

interface TestResultsModalProps {
  isVisible: boolean;
  buttonText: string;
  onPress: () => void;
  kicker: string;
  title: string;
  description: string;
}

const TestResultsModal = ({
  isVisible,
  buttonText,
  kicker,
  title,
  description,
  onPress,
}: TestResultsModalProps) => {
  const onClose = async () => {
    await deleteTestResults();

    onPress();
  };

  return (
    <View>
      <Modal isVisible={isVisible} backdropOpacity={0.5}>
        <ui.Content>
          <ui.Background />
          <ui.Kicker level={2}>{kicker}</ui.Kicker>
          <ui.Title center level={2}>
            {title}
          </ui.Title>
          <ui.Date>{format(new Date(), 'MMMMMMM d, yyyy')}</ui.Date>
          <ui.Description center color={Colors.textGray}>
            {description}
          </ui.Description>
          <CtaButton
            onPress={onClose}
            bgColor={Colors.orange}
            color={Colors.white}
          >
            {buttonText}
          </CtaButton>
        </ui.Content>
      </Modal>
    </View>
  );
};

export default TestResultsModal;
