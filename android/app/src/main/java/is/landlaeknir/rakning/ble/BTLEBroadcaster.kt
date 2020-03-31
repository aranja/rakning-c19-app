/*
 * Copyright © 2020 NHSX. All rights reserved.
 */

package `is`.landlaeknir.rakning.ble

import android.bluetooth.*
import android.bluetooth.BluetoothGatt.GATT_SUCCESS
import android.bluetooth.BluetoothGattCharacteristic.PERMISSION_READ
import android.bluetooth.BluetoothGattCharacteristic.PROPERTY_READ
import android.bluetooth.BluetoothGattService.SERVICE_TYPE_PRIMARY
import android.content.Context
import android.content.SharedPreferences
import android.util.Log


class BTLEBroadcaster(private val context: Context, private val bluetoothManager: BluetoothManager) {
    private val service: BluetoothGattService = BluetoothGattService(
        COLOCATE_SERVICE_UUID,
        SERVICE_TYPE_PRIMARY
    )
        .also {
            it.addCharacteristic(
                BluetoothGattCharacteristic(
                    DEVICE_CHARACTERISTIC_UUID,
                    PROPERTY_READ,
                    PERMISSION_READ
                )
            )
        }

    private lateinit var server: BluetoothGattServer

    fun start() {
        val callback = object : BluetoothGattServerCallback() {
            override fun onCharacteristicReadRequest(
                device: BluetoothDevice,
                requestId: Int,
                offset: Int,
                characteristic: BluetoothGattCharacteristic
            ) {
                Log.i("onCharacteristicReadReq", "UUID: ${characteristic.uuid}")

                val sharedPref: SharedPreferences = context.getSharedPreferences("user-pref", 0)
                if (sharedPref.contains("androidId")) {
                    val androidId = sharedPref.getString("androidId", "")
                    Log.i("SENDING ANDROID ID", "ANDID: $androidId")
                    if (characteristic.isDeviceIdentifier()) {
                        server.sendResponse(
                            device,
                            requestId,
                            GATT_SUCCESS,
                            0,
                            androidId?.toByteArray()
                        )
                    }
                }
            }
        }

        server = bluetoothManager.openGattServer(context, callback).also {
            it.addService(service)
        }
    }

    fun stop() {
        server.close()
    }
}