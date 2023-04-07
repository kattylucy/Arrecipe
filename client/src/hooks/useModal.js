import { useCallback, useState } from "react";

const useModal = (initialValue = false) => {
  const [visible, setVisible] = useState(initialValue);

  const openModal = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);
  const toggleModal = useCallback(() => setVisible((current) => !current), []);

  return [visible, openModal, closeModal, toggleModal];
};

export default useModal;
