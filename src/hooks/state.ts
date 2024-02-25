import React, { useState } from "react";

//globalなexportをまとめたファイル
export const [test, setTest] = useState<string>("test");
export const [userId, setUserId] = useState<string | null>(null);
