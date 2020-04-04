package `is`.landlaeknir.rakning.ble

import `is`.landlaeknir.rakning.db.AppDatabase
import `is`.landlaeknir.rakning.db.ContactEvent
import android.content.SharedPreferences
import android.util.Log
import androidx.room.Room
import com.facebook.react.bridge.*


class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BluetoothModule"
    }

    @ReactMethod
    fun start(deviceId: String) {
        BluetoothService.startService(reactApplicationContext, deviceId)
    }

    @ReactMethod
    fun getContactEvents(promise: Promise) {
        try {
            val db = Room.databaseBuilder(
                    reactApplicationContext,
                    AppDatabase::class.java, "contact-events"
            ).build()
            val list = db.contactEventDao().getAll()
            promise.resolve(convertContactEventsToArray(list))
        }
        catch (error: Exception) {
            promise.reject(error);
        }
    }

    private fun convertContactEventsToArray(contactEvents:List<ContactEvent>):WritableArray {
        val array = WritableNativeArray()
        for (contactEvent in contactEvents)
        {
            val map: WritableMap = WritableNativeMap()
            map.putString("deviceId", contactEvent.deviceId)
            map.putDouble("startDate", contactEvent.startDate.time.toDouble())
            map.putDouble("endDate", contactEvent.endDate.time.toDouble())
            map.putString("proximity", contactEvent.proximity)
            array.pushMap(map)
        }
        return array
    }
}