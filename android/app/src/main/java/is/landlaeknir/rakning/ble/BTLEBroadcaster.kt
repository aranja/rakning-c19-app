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

    fun start(deviceId: String) {
        val callback = object : BluetoothGattServerCallback() {
            override fun onCharacteristicReadRequest(
                device: BluetoothDevice,
                requestId: Int,
                offset: Int,
                characteristic: BluetoothGattCharacteristic
            ) {
                Log.i("onCharacteristicReadReq", "Characteristic UUID: ${characteristic.uuid}")
                Log.i("onCharacteristicReadReq", "Device ID: $deviceId")
                if (characteristic.isDeviceIdentifier()) {
                    server.sendResponse(
                        device,
                        requestId,
                        GATT_SUCCESS,
                        0,
                            deviceId?.toByteArray()
                    )
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