# Job Sequencing with Deadlines
### Design and Analysis of Algorithms (DAA) — Project 4

An interactive web-based visualization of the **Greedy Job Sequencing with Deadlines** algorithm. This project demonstrates how greedy strategies can be used to maximize total profit by scheduling jobs within their deadlines and available time slots.

## Overview

The Job Sequencing with Deadlines problem involves a set of jobs, each associated with a deadline and a profit. Every job takes one unit of time, and a job earns its profit only when completed within its deadline.

The objective is to select and schedule jobs to achieve the **maximum possible total profit** while ensuring that no two jobs occupy the same time slot.

This project combines algorithmic implementation with an interactive user interface to make the scheduling process easier to understand.

## Features

- **Interactive Job Management:** Add, edit, and remove jobs dynamically.
- **Input Validation:** Validate job IDs, deadlines, and profits.
- **Sample Dataset:** Load predefined jobs to test the algorithm.
- **Greedy Scheduling:** Sort jobs by descending profit and schedule each job in the latest available slot before its deadline.
- **Step-by-Step Visualization:** Observe job selection and scheduling decisions.
- **Schedule Display:** View the final allocation of jobs to time slots.
- **Profit Calculation:** Display the maximum total profit obtained.
- **Algorithm Documentation:** Includes pseudocode, time complexity, and auxiliary space analysis.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the application |
| CSS3 | Styling and responsive user interface |
| JavaScript | Greedy algorithm implementation and interactive functionality |

**Dependencies:** No external libraries or frameworks are required.

## Project Structure

```text
Project4_JobSequencing/
├── index.html          # Application structure
├── style.css           # Styling and layout
├── script.js           # Algorithm and interactive logic
├── Algorithm.txt       # Algorithm and pseudocode
├── Prompt.txt          # AI visualization prompt
├── Visualization.png   # Algorithm illustration (if included)
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser.
- Visual Studio Code (recommended).
- Live Server extension for VS Code (optional).

### Installation and Execution

1. Clone or download the project repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` directly in a browser, or launch it using the Live Server extension.
4. Select **Load Sample** to populate the predefined job dataset.
5. Click **Run Algorithm** to execute and visualize the scheduling process.
6. Add or modify jobs to experiment with different inputs.

## Sample Input

| Job ID | Deadline | Profit |
|---|---:|---:|
| a | 2 | 100 |
| b | 1 | 19 |
| c | 2 | 27 |
| d | 1 | 25 |
| e | 3 | 15 |

### Expected Output

| Time Slot | Scheduled Job | Profit |
|---|---|---:|
| 1 | a | 100 |
| 2 | c | 27 |
| 3 | e | 15 |

**Maximum Total Profit: 142**

The selected jobs are `a`, `c`, and `e`. The schedule places each selected job within its deadline while maximizing the total profit.

## Algorithm

The algorithm follows a greedy approach:

1. Sort all jobs in descending order of profit.
2. Find the maximum relevant deadline to determine the available time slots.
3. Consider each job in the sorted order.
4. Search backward from the job's deadline for the latest available time slot.
5. Schedule the job if a valid slot is available.
6. Skip the job if all eligible slots are occupied.
7. Calculate the total profit of the scheduled jobs.

### Pseudocode

```text
JobSequencing(jobs):
    Sort jobs by descending profit
    Find maximum deadline D
    Initialize all time slots as empty
    totalProfit = 0

    for each job in sorted jobs:
        for slot = min(job.deadline, D) down to 1:
            if slot is empty:
                schedule job in slot
                totalProfit += job.profit
                break

    return schedule, totalProfit
```

## Complexity Analysis

Let:
- `n` = number of jobs.
- `D` = maximum relevant deadline, bounded by the number of jobs when larger deadlines are capped appropriately.

| Operation | Complexity |
|---|---|
| Sorting jobs | `O(n log n)` |
| Searching for an available slot | `O(nD)` |
| Total time complexity | `O(n log n + nD)` |
| Auxiliary schedule space | `O(D)` |

The time complexity depends on the number of jobs and the number of available time slots.

## Learning Outcomes

Through this project, users can:

- Understand the greedy algorithm design technique.
- Learn how job deadlines and profits influence scheduling decisions.
- Analyze time and space complexity.
- Observe how greedy choices affect the final solution.
- Connect theoretical algorithm concepts with an interactive implementation.

## Project Deliverables

- `index.html` — Web application interface.
- `style.css` — Application styling.
- `script.js` — Job sequencing algorithm and interactive logic.
- `Algorithm.txt` — Algorithm explanation and pseudocode.
- `Prompt.txt` — Prompt for generating an algorithm illustration.
- `Visualization.png` — Separate algorithm illustration, when required for submission.
- `README.md` — Project overview, setup instructions, and documentation.

## Future Enhancements

- Support additional scheduling strategies for comparison.
- Export the final schedule and profit summary.
- Add animated transitions for individual scheduling decisions.
- Include more test cases and performance comparisons.

## Conclusion

This project demonstrates the practical application of the **Greedy Algorithm** to the Job Sequencing with Deadlines problem. Its interactive visualization helps users understand job selection, deadline constraints, time-slot allocation, and profit maximization in a clear and accessible way.

---

**Project:** Job Sequencing with Deadlines  
**Subject:** Design and Analysis of Algorithms (DAA)  
**Project Type:** Interactive Web-Based Algorithm Visualization
