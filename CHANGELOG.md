# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.3.3] - 2025-05-01

### Fixed
- Added backward compatibility with v5's compare function format for MinPriorityQueue and MaxPriorityQueue
- Fixed iterator type.

## [6.3.2] - 2025-01-05

### Fixed
- ts types.

## [6.3.1] - 2024-01-23
### Fixed
- upgrade @datastructures-js/heap to latest

## [6.3.0] - 2023-05-30
### Added
- `.remove(cb)` to remove all elements that meet a criteria.

## [6.2.0] - 2023-01-16
### Added
- Symbol.iterator

## [6.1.4] - 2022-11-06
### Fixed
- Readme.

## [6.1.3] - 2022-09-04
### Fixed
- upgrade heap to v4.1.2

## [6.1.2] - 2022-08-15
### Fixed
- add types to package.json

## [6.1.1] - 2022-06-26
### Fixed
- typos in readme.

## [6.1.0] - 2022-05-30
### Added
- push & pop as alias methods for enqueue & dequeue

## [6.0.0] - 2022-03-19
### Changed
- new version: improved usage and types

## [5.3.0] - 2021-10-26
### Added
- PriorityQueue as a type for queue with comparator.

## [5.2.0] - 2021-08-08
### Added
- ability to create a priority queue with a comparator.

## [5.1.1] - 2021-06-20

### Fixed
- index.d.ts

## [5.1.0] - 2021-06-17

### Added
- typescript.

## [5.0.3] - 2021-04-27

### Fixed
- README

## [5.0.2] - 2021-03-12

### Fixed
- README

## [5.0.1] - 2021-02-23

### Fixed
- README

## [5.0.0] - 2021-01-24
### Changed
- upgrade heap to latest major version.
- `.enqueue` can now be chanined.

### Added
- a default priority callback that returns the element itself if no callback is provided.

### Fixed
- cleaner error messages.
- README
- jsdoc

## [4.1.2] - 2020-09-22
### Fixed
- Allow any number value for priority.

## [4.1.1] - 2020-05-03
### Fixed
- README
- package.json

## [4.1.0] - 2020-04-22
### Added
- allow passing a priority callback in constructor.

## [4.0.0] - 2020-04-13
### Changed
- split PriorityQueue into `MinPriorityQueue` & `MaxPriorityQueue` to enable working with different type of priorities.

## [3.0.1] - 2020-04-11
### Fixed
- jsdoc

## [3.0.0] - 2020-04-09
### Changed
- `.front()`, `.back()`, `.dequeue()`, `.toArray()` now returns the priority with the element. 

### Fixed
- README
- jsdoc

## [2.0.0] - 2020-03-09
### Changed
- use a Min Heap to store queue elements.
