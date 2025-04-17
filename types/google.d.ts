interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string
          callback: (response: {
            credential: string
            clientId: string
            select_by: string
          }) => void
          auto_select?: boolean
          cancel_on_tap_outside?: boolean
          context?: "signin" | "signup" | "use"
        }) => void
        renderButton: (
          element: HTMLElement,
          options: {
            type?: "standard" | "icon"
            theme?: "outline" | "filled_blue" | "filled_black"
            size?: "large" | "medium" | "small"
            text?: "signin_with" | "signup_with" | "continue_with" | "signin"
            shape?: "rectangular" | "pill" | "circle" | "square"
            logo_alignment?: "left" | "center"
            width?: number
            locale?: string
          },
        ) => void
        prompt: () => void
        cancel: () => void
      }
    }
  }
}
