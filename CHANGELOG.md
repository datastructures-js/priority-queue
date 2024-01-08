# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [4.2.0] - 2024-01-07
### Added
- Allow any number value for priority.

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
