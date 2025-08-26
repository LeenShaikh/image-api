import { DisplayProcessor, SpecReporter, StacktraceOption, } from 'jasmine-spec-reporter';
class CustomProcessor extends DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `\n${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayPending: true,
        displayDuration: true,
        displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
}));
//# sourceMappingURL=reporter.js.map