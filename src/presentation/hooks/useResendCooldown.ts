import { useEffect, useState } from "react";
import SecureStorageImpl from "../../infrastructure/utils/SecureStorageImpl";

const STORAGE_KEY = "resendCooldownUntil";
const secureStorageImpl: SecureStorageImpl = new SecureStorageImpl()

export function useResendCooldown(intervalSeconds: number) {
  const getRemaining = (now: number) => {
    const until = secureStorageImpl.getSecureItem(STORAGE_KEY);
    if (!until) return 0;

    const diff = Math.floor(
      (Number(until) - now) / 1000
    );
    return diff > 0 ? diff : 0;
  };

  const [secondsLeft, setSecondsLeft] = useState(() => getRemaining(Date.now()));

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft(getRemaining(Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const start = () => {
    const until = Date.now() + intervalSeconds * 1000;
    secureStorageImpl.setSecureItem(STORAGE_KEY, String(until));
    setSecondsLeft(intervalSeconds);
  };

  return {
    secondsLeft,
    isDisabled: secondsLeft > 0,
    start,
  };
}