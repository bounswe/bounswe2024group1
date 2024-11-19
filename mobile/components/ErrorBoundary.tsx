import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
          <View className="w-full max-w-xl space-y-8 rounded-xl bg-white p-10 shadow-md">
            <View className="text-center">
              <Text className="mt-6 text-3xl font-extrabold text-gray-900">
                Oops! Something went wrong.
              </Text>
              <p className="mt-2 text-sm text-gray-800">
                We apologize for the inconvenience. Please try refreshing the
                page or contact support if the problem persists.
              </p>
            </View>
            <View className="mt-8 space-y-6">
              <View className="rounded-md bg-red-50 p-4">
                <View className="flex">
                  <View className="ml-3">
                    <Text className="text-sm font-medium text-red-800">
                      Error Details
                    </Text>
                    <View className="mt-2 text-sm text-red-700">
                      <p>{this.state.error && this.state.error.toString()}</p>
                    </View>
                  </View>
                </View>
              </View>
              {this.state.errorInfo && (
                <View className="rounded-md bg-gray-50 p-4">
                  <View className="flex">
                    <View className="ml-3">
                      <Text className="text-sm font-medium text-gray-800">
                        Stack Trace
                      </Text>
                      <View className="mt-2 max-h-40 overflow-auto text-sm text-gray-700">
                        <pre>{this.state.errorInfo.componentStack}</pre>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
