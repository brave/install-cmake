# install-cmake
Download and compile [CMake](https://cmake.org/) for subsequent use by `npm --global install`.
This package installs CMake 3.5.2.
Note that because `cmake` takes such a long time to download and compile,
it is recommended that you install this package in global mode.

Based on Stanley Gu's [cmake](https://github.com/stanleygu/cmake) for npm.

## Installing on Windows
When Windows is detected (via `process.platform === 'win32'`), CMake will be installed via MSI.

This package:
- will add cmake to the system PATH
- requires a single interactive input: allowing escalation to administrator
- can be debugged by setting `captureLogs` to true, enabling verbose logs
- is safe to run if already installed
