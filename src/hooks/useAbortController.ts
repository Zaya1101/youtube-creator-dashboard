export default function useAbortController() {
  const controller = new AbortController();
  const signal = controller.signal;
  return { controller, signal }
}