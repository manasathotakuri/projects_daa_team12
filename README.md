# Project 4 — Job Sequencing with Deadlines

An interactive web-based visualization of the Greedy Job Sequencing with Deadlines algorithm for a Design and Analysis of Algorithms (DAA) macro project.

## Features
- Add, remove, and edit jobs.
- Validate job IDs, deadlines, and profits.
- Load a built-in sample.
- Sort jobs by descending profit and show each scheduling decision.
- Display the final time-slot schedule and total profit.
- Includes algorithm pseudocode, complexity, and an AI visualization prompt.

## Technologies
- HTML
- CSS
- JavaScript (no external libraries)

## How to run
1. Download or clone this project folder.
2. Open `index.html` in a browser, or open the folder in VS Code and use the Live Server extension.
3. Click **Load sample** and then **Run algorithm** to test the sample.
4. Edit the jobs to try other inputs.

## Sample input
| Job ID | Deadline | Profit |
|---|---:|---:|
| a | 2 | 100 |
| b | 1 | 19 |
| c | 2 | 27 |
| d | 1 | 25 |
| e | 3 | 15 |

Expected maximum profit: **142**, with jobs `a`, `c`, and `e` scheduled.

## Algorithm summary
Sort jobs by profit in descending order. For each job, place it in the latest available time slot at or before its deadline. Skip it if no slot is free.

## Complexity
- Time: `O(n log n + nD)`, where `n` is the number of jobs and `D` is the maximum relevant deadline.
- Auxiliary schedule space: `O(D)`.

## Submission files
- `Algorithm.txt` — algorithm and pseudocode.
- `Prompt.txt` — prompt for an AI-generated diagram.
- `Visualization.png` — add the diagram generated with the prompt in `Prompt.txt`.
- `README.md` — project documentation.

## Important
The website includes an algorithm-generated interactive visualization. The separate `Visualization.png` requested for submission should be generated with an AI image tool using `Prompt.txt`, then saved in this folder. Do not present the interactive website screenshot as an AI-generated image.
