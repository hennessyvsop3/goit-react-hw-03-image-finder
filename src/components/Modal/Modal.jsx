import { CloseButton, ModalContent, ModalWrapper } from "./Modal.styled";

import React, { Component } from "react";

export default class Modal extends Component {
  handleCloseKeyDown = (e) => {
    if (e.key === "Escape") {
      this.props.close();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.close();
    }
  };

  componentDidMount() {
    console.log("MOUNT");
    document.addEventListener("keydown", this.handleCloseKeyDown);
  }

  componentWillUnmount() {
    console.log("UNMOUNT");
    document.removeEventListener("keydown", this.handleCloseKeyDown);
  }

  render() {
    const { children, close } = this.props;
    return (
      <ModalWrapper onClick={this.handleBackdropClick}>
        <ModalContent>
          <>
            <img src={this.props.url} alt="Pixabay" />
          </>
          <CloseButton onClick={close}>×</CloseButton>
          {children}
        </ModalContent>
      </ModalWrapper>
    );
  }
}
