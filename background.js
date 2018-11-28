'use strict';
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
// });

const RELOAD_ALL_CONTEXTMENU_ITEM_ID = "ReloadAll_ID";
const RELOAD_ALL_CONTEXTMENU_ITEM_TITLE = "Reload All";

const RELOAD_OTHER_CONTEXTMENU_ITEM_ID = "Reload_OTHER_ID";
const RELOAD_OTHER_CONTEXTMENU_ITEM_TITLE = "Reload Other tabs";

const CLOSE_OTHER_CONTEXTMENU_ITEM_ID = "Close_OTHER_ID";
const CLOSE_OTHER_CONTEXTMENU_ITEM_TITLE = "Close other tabs";

const CLOSE_ALL_CONTEXTMENU_ITEM_ID = "CloseAll_ID";
const CLOSE_ALL_CONTEXTMENU_ITEM_TITLE = "Close All";

const MUTE_ALL_CONTEXTMENU_ITEM_ID = "MuteAll_Id";
const MUTE_ALL_CONTEXTMENU_ITEM_TITLE = "Mute All";

const MUTE_OTHER_CONTEXTMENU_ITEM_ID = "Mute_Other_Id";
const MUTE_OTHER_CONTEXTMENU_ITEM_TITLE = "Mute other tabs";

const UNMUTE_ALL_CONTEXTMENU_ITEM_ID = "UnmuteAll_Id";
const UNMUTE_ALL_CONTEXTMENU_ITEM_TITLE = "Unmute All";

const UNMUTE_OTHER_CONTEXTMENU_ITEM_ID = "Unmute_Other_Id";
const UNMUTE_OTHER_CONTEXTMENU_ITEM_TITLE = "Unmute other tabs";




chrome.contextMenus.create({
  id:CLOSE_ALL_CONTEXTMENU_ITEM_ID,
  title: CLOSE_ALL_CONTEXTMENU_ITEM_TITLE,
  type:"normal"
},function(){
  buildNestedContextMenuItems();
});

function buildNestedContextMenuItems(){
  chrome.contextMenus.create({
    id: CLOSE_OTHER_CONTEXTMENU_ITEM_ID,
    title: CLOSE_OTHER_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  chrome.contextMenus.create({
    id: RELOAD_ALL_CONTEXTMENU_ITEM_ID,
    title: RELOAD_ALL_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  chrome.contextMenus.create({
    id: RELOAD_OTHER_CONTEXTMENU_ITEM_ID,
    title: RELOAD_OTHER_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
  chrome.contextMenus.create({
    id: MUTE_ALL_CONTEXTMENU_ITEM_ID,
    title: MUTE_ALL_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });

  chrome.contextMenus.create({
    id: MUTE_OTHER_CONTEXTMENU_ITEM_ID,
    title: MUTE_OTHER_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });

  chrome.contextMenus.create({
    id: UNMUTE_ALL_CONTEXTMENU_ITEM_ID,
    title: UNMUTE_ALL_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });


  chrome.contextMenus.create({
    id: UNMUTE_OTHER_CONTEXTMENU_ITEM_ID,
    title: UNMUTE_OTHER_CONTEXTMENU_ITEM_TITLE,
    type:"normal",
  });
}

function ContextMenuLinkActions(tab, currentTab, contextMenuItemId){
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

chrome.contextMenus.onClicked.addListener(function(clickedContextMenu, tab) {
  var currentTab = tab;
  ContextMenuLinkActions(tab,currentTab,clickedContextMenu.menuItemId);
});


