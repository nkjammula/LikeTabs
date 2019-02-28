// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const RELOAD_ALL_CONTEXTMENU_ITEM_ID = "ReloadAll_ID";

const RELOAD_OTHER_CONTEXTMENU_ITEM_ID = "Reload_OTHER_ID";

const CLOSE_OTHER_CONTEXTMENU_ITEM_ID = "Close_OTHER_ID";

const CLOSE_ALL_CONTEXTMENU_ITEM_ID = "CloseAll_ID";

const MUTE_ALL_CONTEXTMENU_ITEM_ID = "MuteAll_Id";

const MUTE_OTHER_CONTEXTMENU_ITEM_ID = "Mute_Other_Id";

const UNMUTE_ALL_CONTEXTMENU_ITEM_ID = "UnmuteAll_Id";

const UNMUTE_OTHER_CONTEXTMENU_ITEM_ID = "Unmute_Other_Id";

console.log("I am clicked");
// let changeColor = document.getElementById('changeColor');
document.addEventListener('DOMContentLoaded', function() {
    var actionMenuContainer = document.getElementById('browserActionMenu');
    
    // onClick's logic below:
    // actionMenuContainer.addEventListener('click', actionMenuItems(elementId));

    actionMenuContainer.addEventListener('click', function() {
        var elementId = event.target.id;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            ContextMenuLinkActions(currentTab,elementId);
          });
    });
});

function actionMenuItems(elementId){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        ContextMenuLinkActions(currentTab,elementId);
      });
}
function ContextMenuLinkActions(currentTab, contextMenuItemId){
    chrome.windows.getAll({populate:true},function(windows){
      windows.forEach(function(window){
        window.tabs.forEach(function(tab){
          var url = new URL(tab.url);
          var currentTabUrl = new URL(currentTab.url);
          var currentTabHostName = currentTabUrl.hostname;
          if(url.hostname === currentTabHostName){
            switch(contextMenuItemId){
  
              case CLOSE_ALL_CONTEXTMENU_ITEM_ID:
                  chrome.tabs.remove(tab.id);
                  break;
  
              case CLOSE_OTHER_CONTEXTMENU_ITEM_ID:
                   if(currentTab.id != tab.id ){
                    chrome.tabs.remove(tab.id);
                   }
                   break;
  
              case RELOAD_ALL_CONTEXTMENU_ITEM_ID:
                  chrome.tabs.reload(tab.id);
                  break;
  
              case RELOAD_OTHER_CONTEXTMENU_ITEM_ID:
                  if(currentTab.id != tab.id ){
                    chrome.tabs.reload(tab.id);
                  }
                  break;
  
              case MUTE_ALL_CONTEXTMENU_ITEM_ID:
                  chrome.tabs.update(tab.id,{muted: true});
                  break;
  
              case MUTE_OTHER_CONTEXTMENU_ITEM_ID:
                  if(currentTab.id != tab.id ){
                    chrome.tabs.update(tab.id,{muted: true});
                  }
                  break;
  
              case UNMUTE_ALL_CONTEXTMENU_ITEM_ID:
                  chrome.tabs.update(tab.id,{muted: false});
                  break;
  
              case UNMUTE_OTHER_CONTEXTMENU_ITEM_ID:
                  if(currentTab.id != tab.id ){
                    chrome.tabs.update(tab.id,{muted: false});
                  }
                  break;
            }
          }
        });
      });
    });
  }
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //       chrome.tabs.executeScript(
    //           tabs[0].id,
    //           {file: 'content.js'});
    //     });