export function makeModifier(block, modifier) {
  return `${block}--${modifier}`;
}

/**
 * Higher order function that makes constructing BEM css classnames easier.
 * The initial function 'defineBlock' allows you to register the block name.
 * The returned function will have that block name in its closure.
 * You can use the returned 'bem' function to create bem classes. The first
 * argument of the bem function is the element name and the follow arguments
 * can be either strings of modifiers or an object with it's key being the modifier
 * name and the value being an expression determining if the classname should be applied
 * or not depending on if the value returns truthy or not
 *
 * @example
 * const bem = defineBlock('Block')
 * const className = bem('element') // => 'Block__element'
 *
 * @example
 * const bem = defineBlock('Block')
 * const className = bem('element', 'modifier') // => Block__element Block__element--modifier
 *
 * @example
 * const bem = defineBlock('Block')
 * const className = bem(['element1', 'element2']) // => Block__element1 Block__element2
 *
 * @example
 * const bem = defineBlock('Block')
 * const className = bem('element', {
 *  'active': true,
 *  'hidden': false
 * }) // => Block__element Block__element--active
 */
export default function defineBlock(block) {
  return function bem(element, ...modifiers) {
    if (typeof element === 'function') {
      return element(block);
    }

    const classes = [];
    const elements = [];

    if (Array.isArray(element)) {
      element.forEach((el) => {
        const base = block + (el ? `__${el}` : '');
        elements.push(base);
      });
    } else {
      const base = block + (element ? `__${element}` : '');
      elements.push(base);
    }

    elements.forEach((el) => {
      classes.push(el);
    });

    modifiers.forEach((modifier) => {
      if (typeof modifier === 'string') {
        elements.forEach((el) => {
          classes.push(makeModifier(el, modifier));
        });
      }

      if (typeof modifier === 'object') {
        Object.keys(modifier).forEach((key) => {
          if (modifier[key]) {
            elements.forEach((el) => {
              classes.push(makeModifier(el, key));
            });
          }
        });
      }
    });

    return classes.join(' ');
  };
}
