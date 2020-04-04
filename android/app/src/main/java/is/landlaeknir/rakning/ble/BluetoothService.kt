/*
 * Copyright © 2020 NHSX. All rights reserved.
 */

package `is`.landlaeknir.rakning.ble

import `is`.landlaeknir.rakning.db.AppDatabase
import `is`.landlaeknir.rakning.db.ContactEventDao
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.bluetooth.BluetoothManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import androidx.room.Room
import io.invertase.firebase.app.ReactNativeFirebaseApp.getApplicationContext

const val EXTRA_DEVICE_ID = "EXTRA_DEVICE_ID"

class BluetoothService : Service() {
    companion object {
        fun startService(context: Context, deviceId: String) {
            val startIntent = Intent(getApplicationContext(), BluetoothService::class.java)
            startIntent.putExtra(EXTRA_DEVICE_ID, deviceId)
            ContextCompat.startForegroundService(context, startIntent)
        }

        fun stopService(context: Context) {
            val stopIntent = Intent(context, BluetoothService::class.java)
            context.stopService(stopIntent)
        }

        const val COLOCATE_SERVICE_ID = 1235
        const val COLOCATE_NOTIFICATION_ID = "colocate-locate"
    }

    private lateinit var advertise: Advertise
    private lateinit var scan: BTLEListener
    private lateinit var btleBroadcaster: BTLEBroadcaster
    private lateinit var db: AppDatabase

    override fun onCreate() {
        super.onCreate()
        startForeground(COLOCATE_SERVICE_ID, notification())
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val bluetoothManager = getSystemService(BLUETOOTH_SERVICE) as BluetoothManager?

        if (bluetoothManager?.adapter == null || !isPermissionGranted()) {
            return START_NOT_STICKY
        }

        val deviceId = intent?.getSerializableExtra(EXTRA_DEVICE_ID) as? String ?: return START_NOT_STICKY
        db = Room.databaseBuilder(
                this,
                AppDatabase::class.java, "contact-events"
        ).build()

        btleBroadcaster = BTLEBroadcaster(this, bluetoothManager).also {
            it.start(deviceId)
        }
        advertise = Advertise(bluetoothManager.adapter.bluetoothLeAdvertiser).also {
            it.start()
        }
        scan = BTLEListener(this, bluetoothManager.adapter.bluetoothLeScanner, db.contactEventDao()).also {
            it.start()
        }

        return START_STICKY
    }

    override fun onDestroy() {
        stop()
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        stop()
    }

    private fun stop() {
        btleBroadcaster.stop()
        scan.stop()
        advertise.stop()
        db.close()
    }

    private fun isPermissionGranted() = true

    private fun notification(): Notification {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel(
                COLOCATE_NOTIFICATION_ID,
                "NHS Colocate",
                NotificationManager.IMPORTANCE_DEFAULT
            ).let {
                (getSystemService(NOTIFICATION_SERVICE) as NotificationManager)
                    .createNotificationChannel(it)
            }
            NotificationCompat.Builder(
                this,
                COLOCATE_NOTIFICATION_ID
            ).build()
        } else {
            NotificationCompat.Builder(this, "").build()
        }
    }
}

