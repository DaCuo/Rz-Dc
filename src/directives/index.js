
export const imgerror = {

  inserted(el, vla, xndom) {
    el.onerror = () => {
      el.src = vla.value
    }
  }

}
