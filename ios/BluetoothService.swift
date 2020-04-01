//
//  BluetoothService.swift
//  Rakning
//
//  Created by Ægir Thorsteinsson on 3/31/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation


class BluetoothService: BTLEBroadcasterDelegate, BTLEListenerDelegate {
    private var btleReady: (listenerReady: Bool, broadcasterReady: Bool) = (false, false)
    var broadcaster: BTLEBroadcaster = BTLEBroadcaster()
    var listener: BTLEListener = BTLEListener()
    
    func btleBroadcaster(_ broadcaster: BTLEBroadcaster, didUpdateState state: CBManagerState) {
        if state == .poweredOn {
            btleReady.broadcasterReady = true
        }
    }
    
    func btleListener(_ listener: BTLEListener, didUpdateState state: CBManagerState) {
        if state == .poweredOn {
            btleReady.listenerReady = true
        }
    }

    @objc
    func start() {
      self.broadcaster.start(delegate: self)
      self.listener.start(delegate: self)
    }
}
