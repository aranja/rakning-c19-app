//
//  BluetoothModule.swift
//  Rakning
//
//  Created by Ægir Thorsteinsson on 3/31/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

@objc(BluetoothModule)
class BluetoothModule: NSObject {
  var service = BluetoothService()
    
  @objc
  func start() {
    self.service.start()
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
