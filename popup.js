// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var actionMenuContainer = document.getElementById('browserActionMenu');
   
    actionMenuContainer.addEventListener('click', function() {
        var elementId = event.target.id;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            chrome.extension.getBackgroundPage().ContextMenuLinkActions(currentTab,elementId);
            window.close();
          });
    });
});
