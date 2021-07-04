// @ts-nocheck

import MediumEditor from 'medium-editor';

/**
 * A button that inserts image caption by wrapping selected text inside `<figcaption>`
 *
 * Reference: https://github.com/yabwe/medium-editor/blob/master/src/js/extensions/button.js
 */
export const ImageCaption = MediumEditor.Extension.extend({
  name: 'imageCaption',
  tagNames: ['figcaption'],

  constructor: function (options) {
    MediumEditor.Extension.call(this, options);
  },

  init: function () {
    MediumEditor.extensions.button.prototype.init.call(this);

    this.button = this.createButton();
    this.on(this.button, 'click', this.handleClick.bind(this));
  },

  getButton: function () {
    return this.button;
  },

  getTagNames: function () {
    return typeof this.tagNames === 'function'
      ? this.tagNames(this.base.options)
      : this.tagNames;
  },

  createButton: function () {
    const button = this.document.createElement('button');

    button.classList.add('medium-editor-action');
    button.title = 'image caption';
    button.innerHTML = '<i class="fas fa-closed-captioning"></i>';

    return button;
  },

  handleClick: function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Skip if no text selected
    this.selectionState = this.base.exportSelection();
    if (
      this.selectionState &&
      this.selectionState.end - this.selectionState.start === 0
    ) {
      return;
    }

    const selectedText = MediumEditor.selection
      .getSelectionRange(this.document)
      .toString();

    if (this.isActive()) {
      const currentNode = MediumEditor.selection.getSelectionStart(
        this.document,
      );

      // Replace <figcaption>xxx</figcaption> with <p>xxx</p>
      const newNode = this.document.createElement('p');
      newNode.innerHTML = selectedText;
      currentNode.parentNode.replaceChild(newNode, currentNode);

      this.setInactive();
    } else {
      this.execAction('insertHTML', {
        value: `<figcaption>${selectedText}</figcaption>`,
      });
    }
  },

  isActive: function () {
    return this.button.classList.contains(
      this.getEditorOption('activeButtonClass'),
    );
  },

  setInactive: function () {
    this.button.classList.remove(this.getEditorOption('activeButtonClass'));
    delete this.knownState;
  },

  setActive: function () {
    this.button.classList.add(this.getEditorOption('activeButtonClass'));
    delete this.knownState;
  },

  queryCommandState: function () {
    let queryState = null;
    if (this.useQueryState) {
      queryState = this.base.queryCommandState(this.getAction());
    }
    return queryState;
  },

  isAlreadyApplied: function (node) {
    const tagNames = this.getTagNames();
    let isMatch = false;
    let styleVals;
    let computedStyle;

    if (this.knownState === false || this.knownState === true) {
      return this.knownState;
    }

    if (tagNames && tagNames.length > 0) {
      isMatch = tagNames.indexOf(node.nodeName.toLowerCase()) !== -1;
    }

    if (!isMatch && this.style) {
      styleVals = this.style.value.split('|');
      computedStyle = this.window
        .getComputedStyle(node, null)
        .getPropertyValue(this.style.prop);
      styleVals.forEach(function (val) {
        if (!this.knownState) {
          isMatch = computedStyle.indexOf(val) !== -1;
          // text-decoration is not inherited by default
          // so if the computed style for text-decoration doesn't match
          // don't write to knownState so we can fallback to other checks
          if (isMatch || this.style.prop !== 'text-decoration') {
            this.knownState = isMatch;
          }
        }
      }, this);
    }

    return isMatch;
  },
});
