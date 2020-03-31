package `is`.landlaeknir.rakning.ble

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BluetoothModule"
    }

    @ReactMethod
    fun start() {
        BluetoothService.startService(reactApplicationContext)
    }
}