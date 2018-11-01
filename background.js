'use strict';
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
});

const RELOAD_ALL_CONTEXTMENU_ITEM_ID = "ReloadAll_ID";
const RELOAD_ALL_CONTEXTMENU_ITEM_TITLE = "Reload All";

const CLOSE_CONTEXTMENU_ITEM_ID = "Close_ID";
const CLOSE_CONTEXTMENU_ITEM_TITLE = "Close other tabs";

const CLOSE_ALL_CONTEXTMENU_ITEM_ID = "CloseAll_ID";
const CLOSE_ALL_CONTEXTMENU_ITEM_TITLE = "Close All";

const MUTE_ALL_CONTEXTMENU_ITEM_ID = "MuteAll_Id";
const MUTE_ALL_CONTEXTMENU_ITEM_TITLE = "Mute All";

const UNMUTE_ALL_CONTEXTMENU_ITEM_ID = "UnmuteAll_Id";
const UNMUTE_ALL_CONTEXTMENU_ITEM_TITLE = "Unmute All";

const DUPLICATE_CONTEXTMENU_ITEM_ID = "Duplicate_Id";
const DUPLICATE_CONTEXTMENU_ITEM_TITLE = "Duplicate";

const PIN_CONTEXTMENU_ITEM_ID = "Pin_Id";
const PIN_CONTEXTMENU_ITEM_TITLE = "Pin";

const UNPIN_CONTEXTMENU_ITEM_ID = "UnPin_Id";
const UNPIN_CONTEXTMENU_ITEM_TITLE = "UnPin";


chrome.contextMenus.create({
  id:CLOSE_ALL_CONTEXTMENU_ITEM_ID,
  title: CLOSE_ALL_CONTEXTMENU_ITEM_TITLE,
  type:"normal"
},function(){
  buildNestedContextMenuItems();
});

function buildNestedContextMenuItems(){
  chrome.contextMenus.create({
    id: CLOSE_CONTEXTMENU_ITEM_ID,
    title: CLOSE_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  chrome.contextMenus.create({
    id: RELOAD_ALL_CONTEXTMENU_ITEM_ID,
    title: RELOAD_ALL_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  chrome.contextMenus.create({
    id: MUTE_ALL_CONTEXTMENU_ITEM_ID,
    title: MUTE_ALL_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  chrome.contextMenus.create({
    id: UNMUTE_ALL_CONTEXTMENU_ITEM_ID,
    title: UNMUTE_ALL_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  // chrome.contextMenus.create({
  //   id: DUPLICATE_CONTEXTMENU_ITEM_ID,
  //   title: DUPLICATE_CONTEXTMENU_ITEM_TITLE,
  //   type:"normal",
  // });
  // chrome.contextMenus.create({
  //   id: PIN_CONTEXTMENU_ITEM_ID,
  //   title: PIN_CONTEXTMENU_ITEM_TITLE,
  //   type:"normal",
  // });
  // chrome.contextMenus.create({
  //   id: UNPIN_CONTEXTMENU_ITEM_ID,
  //   title: UNPIN_CONTEXTMENU_ITEM_TITLE,
  //   type:"normal",
  // });
}

function ContextMenuLinkActions(tab, currentTab, contextMenuItemId){
  chrome.windows.getAll({populate:true},function(windows){
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        var url = new URL(tab.url);
        var currentTabUrl = new URL(currentTab.url);
        var currentTabHostName = currentTabUrl.hostname;
        if(url.hostname === currentTabHostName){
          if(contextMenuItemId === CLOSE_ALL_CONTEXTMENU_ITEM_ID){
            chrome.tabs.remove(tab.id);
          }
          if(contextMenuItemId === RELOAD_ALL_CONTEXTMENU_ITEM_ID){
            chrome.tabs.reload(tab.id);
          }
          if(contextMenuItemId === CLOSE_CONTEXTMENU_ITEM_ID && currentTab.id != tab.id ){
            chrome.tabs.remove(tab.id);
          }
          if(contextMenuItemId === MUTE_ALL_CONTEXTMENU_ITEM_ID){
            chrome.tabs.update(tab.id,{muted: true});
          }
          if(contextMenuItemId === UNMUTE_ALL_CONTEXTMENU_ITEM_ID){
            chrome.tabs.update(tab.id,{muted: false});
          }
          // if(contextMenuItemId === DUPLICATE_CONTEXTMENU_ITEM_ID){
          //   chrome.tabs.duplicate(currentTab.id);
          // }
          // if(contextMenuItemId === PIN_CONTEXTMENU_ITEM_ID){
          //   chrome.tabs.update(tab.id,{pinned: true});
          // }
          // if(contextMenuItemId === UNPIN_CONTEXTMENU_ITEM_ID){
          //   chrome.tabs.update(tab.id,{pinned: false});
          // }
        }
      });
    });
  });
}

chrome.contextMenus.onClicked.addListener(function(clickedContextMenu, tab) {
  var currentTab = tab;
  ContextMenuLinkActions(tab,currentTab,clickedContextMenu.menuItemId);
});


