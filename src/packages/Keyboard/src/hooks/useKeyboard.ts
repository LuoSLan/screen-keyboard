import { ref, unref, useTemplateRef } from 'vue';
import type { Ref, EmitsOptions } from 'vue';
import type {
  InsertTxtAndSetCursor,
  EmitOptions,
  Recordable,
  keyboardPosition,
} from '../types/keyboard';

/**
 *
 * @param key keyboard元素的ref的key
 * @param moveOptions 移动参数 { moveX, moveY, isMoving }
 * @property moveX x轴移动距离
 * @property moveY y轴移动距离
 * @property isMoving 是否可以移动
 * @returns
 */
export function useKeyboard(
  // key: string,
  moveOptions: { moveX: Ref<number>; moveY: Ref<number>; isMoving: Ref<boolean> }
) {
  const { moveX, moveY, isMoving } = moveOptions;
  const keyboardEl = ref<HTMLElement | null>(null);
  // const keyboardEl = useTemplateRef<HTMLElement>(key);
  const downInfo: Ref<any> = ref({});

  const moveAction = (e: MouseEvent | Touch) => {
    if (keyboardEl.value) {
      const maxh =
        (document.documentElement.clientHeight || document.body.clientHeight) -
        keyboardEl.value.clientHeight;
      const htj = downInfo.value.bottom + downInfo.value.y - e.pageY;
      const maxw =
        (document.documentElement.clientWidth || document.body.clientWidth) -
        keyboardEl.value.clientWidth;
      const wtj = downInfo.value.left - (downInfo.value.x - e.pageX);
      if (wtj <= maxw && wtj >= 0) {
        moveX.value = wtj;
      }
      if (htj <= maxh && htj >= 0) {
        moveY.value = htj;
      }
    }
  };

  const keyMove = (e: MouseEvent) => {
    if (isMoving.value) {
      moveAction(e);
    }
  };

  const keyDown = (e: MouseEvent) => {
    downInfo.value.x = e.pageX;
    downInfo.value.y = e.pageY;
    downInfo.value.left = moveX.value;
    downInfo.value.bottom = moveY.value;

    isMoving.value = true;
    document.addEventListener('mousemove', keyMove);

    document.addEventListener('mouseup', keyUp, {
      once: true,
    });
  };

  const keyUp = () => {
    isMoving.value = false;
    document.removeEventListener('mousemove', keyMove);
  };

  const touchMove = (e: TouchEvent) => {
    if (isMoving.value) {
      moveAction(e.touches[0]);
    }
  };

  const touchStart = (e: TouchEvent) => {
    downInfo.value.x = e.touches[0].pageX;
    downInfo.value.y = e.touches[0].pageY;
    downInfo.value.left = moveX.value;
    downInfo.value.bottom = moveY.value;

    isMoving.value = true;
    document.addEventListener('touchmove', touchMove);

    document.addEventListener('touchend', touchEnd, {
      once: true,
    });
  };

  const touchEnd = () => {
    isMoving.value = false;
    document.removeEventListener('touchmove', touchMove);
  };

  return {
    keyboardEl,
    keyDown,
    touchStart,
  };
}

/**
 *
 * @param key input元素的ref的key
 * @param emitOptions emit的参数 { emitFn, changeEventName, inputEventName }
 * @property emitFn 事件触发函数
 * @property changeEventName change事件名称 (返回完整全部的input值)
 * @property inputEventName input事件名称 (返回当前输入的值)
 * @returns
 */
export function useKeyboardInput<E extends EmitsOptions = EmitsOptions>(
  emitOptions: EmitOptions<E>
) {
  // const inputDom = useTemplateRef<HTMLInputElement>(key);
  const inputDom = ref<HTMLInputElement | null>(null);

  const insertTxtAndSetCursor: InsertTxtAndSetCursor = (
    text,
    del?,
    delAll?
  ) => {
    if (!unref(inputDom)) {
      return;
    }

    let element: HTMLInputElement | null = unref(inputDom);
    let startPos: number | null = element?.selectionStart ?? null;
    let endPos: number | null = element?.selectionEnd ?? null;
    if (startPos === null || endPos === null) return;
    let oldTxt: string = element?.value || '';
    let result: string = '';
    const num: number = startPos - 1;
    if (del && num >= 0) {
      result = oldTxt.substring(0, startPos - 1) + oldTxt.substring(endPos);
    } else if (delAll && num >= 0) {
      result = '';
    } else {
      result = oldTxt.substring(0, startPos) + text + oldTxt.substring(endPos);
    }
    if (element) {
      const { emitFn, changeEventName, inputEventName } = emitOptions;
      emitFn?.(changeEventName, result);
      emitFn?.(inputEventName, text);
      element.value = result;
      element.focus();
      if (del && num >= 0) {
        element.selectionStart = startPos - 1 + (text + '').length;
        element.selectionEnd = startPos - 1 + (text + '').length;
      } else if (delAll && num >= 0) {
        element.selectionStart = 0;
        element.selectionEnd = 0;
      } else {
        element.selectionStart = startPos + (text + '').length;
        element.selectionEnd = startPos + (text + '').length;
      }
      return result;
    }
  };

  return {
    insertTxtAndSetCursor,
    keyboardInputRef: inputDom,
  };
}

export function useKeyboardPotion(props) {
  const moveX = ref(0);
  const moveY = ref(0);
  const isMoving = ref(false);

  const position = props.position as keyboardPosition;
  const defaultType = props.defaultType as string;
  if (!position) {
    throw new Error('position is required');
  }

  const setXY = (value: [number, number]) => {
    moveX.value = value[0];
    moveY.value = value[1];
  };

  const keyboardWH = {
    number: {
      width: 353,
      height: 306,
    },
    text: {
      width: 600,
      height: 245,
    },
  };

  // 获取视口宽高
  const { clientWidth, clientHeight } =
    document.documentElement || document.body;

  // 计算最大移动范围
  const maxMove = {
    x: clientWidth - keyboardWH[defaultType].width,
    y: clientHeight - keyboardWH[defaultType].height,
  };

  if (Array.isArray(position) && position.length === 2) {
    if (!position.every((item) => typeof item === 'number')) {
      throw new Error('position must be an array of two numbers');
    }

    if (!position.every((item) => item >= 0)) {
      throw new Error('position must be an array of two positive numbers');
    }

    let calcValue = position;
    if (position[0] > maxMove.x) calcValue[0] = maxMove.x;
    if (position[1] > maxMove.y) calcValue[1] = maxMove.y;

    setXY(calcValue);
  }

  if (typeof position === 'string') {
    // 计算位置
    const positionMap: Recordable<[number, number]> = {
      center: [maxMove.x / 2, maxMove.y / 2],
      leftTop: [0, maxMove.y],
      leftBottom: [0, 0],
      rightTop: [maxMove.x, maxMove.y],
      rightBottom: [maxMove.x, 0],
    };
    setXY(positionMap[position]);
  }

  return {
    moveX,
    moveY,
    isMoving,
  };
}
