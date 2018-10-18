// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
});


chrome.contextMenus.create({
  id:"Reload_Like_Tabs",
  title: "Reload Like Tabs",
  type:"normal",
},function(){
  buildNestedContextMenuItems();
});

function buildNestedContextMenuItems(){
  chrome.contextMenus.create({
    id:"Close_Like_Tabs",
    title: "Close Like Tabs",
    type:"normal"
  });
}

chrome.contextMenus.onClicked.addListener(function(clickTaggedImage, tab) {
  var currentTab = tab;
  if (clickTaggedImage.menuItemId === "Close_Like_Tabs") {
    chrome.windows.getAll({populate:true},function(windows){
      windows.forEach(function(window){
        window.tabs.forEach(function(tab){
          var url = new URL(tab.url);
          var currentTabUrl = new URL(currentTab.url);
          var currentTabHostName = currentTabUrl.hostname;
          if(url.hostname === currentTabHostName){
            chrome.tabs.remove(tab.id);
          }
        });
      });
    });
  }

  if (clickTaggedImage.menuItemId === "Reload_Like_Tabs") {
    chrome.windows.getAll({populate:true},function(windows){
      windows.forEach(function(window){
        window.tabs.forEach(function(tab){
          var url = new URL(tab.url);
          var currentTabUrl = new URL(currentTab.url);
          var currentTabHostName = currentTabUrl.hostname;
          if(url.hostname === currentTabHostName){
            chrome.tabs.reload(tab.id);
          }
        });
      });
    });
  }
  
});
