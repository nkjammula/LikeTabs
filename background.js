'use strict';

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

chrome.contextMenus.onClicked.addListener(function(clickedContextMenu, tab) {
  var currentTab = tab;
  ContextMenuLinkActions(currentTab,clickedContextMenu.menuItemId);
});


