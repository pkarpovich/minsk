import { memo, PureComponent } from "react";

class ImageErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return { errorMessage: error.message };
  }

  render() {
    if (this.state.errorMessage) {
      return this.props.errorFallback(this.state.errorMessage);
    }

    return this.props.children;
  }
}

export default memo(ImageErrorBoundary);
