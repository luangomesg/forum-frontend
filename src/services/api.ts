

export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!response.ok) {
    let message = "Erro na requisição";

    try {
      const errorBody = await response.json();

      if (typeof errorBody.message === "string") {
        message = errorBody.message;
      } else if (Array.isArray(errorBody.message)) {
        message = errorBody.message[0];
      }
    } catch {
      const text = await response.text();
      if (text) message = text;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (null as T);
}
