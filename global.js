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