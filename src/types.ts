import { KeyValue } from "@grafana/data";

export interface VerificationOptions {
  tests: string;
  data: any;
}

export const defaults: VerificationOptions = {
  tests: '',
  data: {},
};

export interface VerificationType {
  editor: VerificationOptions;
}

export type TestParameters = KeyValue<any>
export type TestAssertion = KeyValue<TestParameters>
export type TestCases = KeyValue<TestAssertion>
