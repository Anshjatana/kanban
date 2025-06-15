import React, { useEffect, useRef } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import {
  Backdrop,
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./styles";
import type { ModalProps } from "../../types";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  preventScroll = true,
  children,
  footer,
  className,
}) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handling scroll prevention
  useEffect(() => {
    if (!isOpen || !preventScroll) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, preventScroll]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Backdrop $isClosing={isClosing} onClick={handleBackdropClick}>
      <ModalContainer
        ref={modalRef}
        $size={size}
        $isClosing={isClosing}
        className={className}
        tabIndex={-1}
      >
        <ModalHeader $hasTitle={!!title}>
          {title && <ModalTitle id="modal-title">{title}</ModalTitle>}
          {showCloseButton && (
            <CloseButton
              onClick={handleClose}
              type="button"
            >
              <CloseIcon />
            </CloseButton>
          )}
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
