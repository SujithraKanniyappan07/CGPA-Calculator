# Anna University GPA & CGPA Calculator

A web-based GPA and CGPA calculator developed for students following the **Anna University R2023 Regulation**. The calculator is currently configured with the **Industrial Engineering curriculum**, including semester-wise subjects and their corresponding credits.

The primary objective of this project is to provide a straightforward and reliable way to calculate semester GPA and cumulative CGPA based on the credit-weighted grading system.

## Features

- Semester-wise GPA calculation from Semester 1 to Semester 8
- Credit-weighted overall CGPA calculation
- Semester-wise subject and credit information
- Grade selection for individual subjects
- Temporary course addition for courses not included in the predefined curriculum
- GPA dashboard showing the performance across completed semesters
- Automatic update of CGPA when semester results are added or modified
- Responsive interface for desktop and mobile devices
- Dedicated user guide for understanding the calculator and its calculation method

## Calculation Method

### GPA

The semester GPA is calculated using the weighted average of grade points based on the credits assigned to each course.

\[
GPA = \frac{\sum(Grade\ Point \times Course\ Credit)}
{\sum Course\ Credits}
\]

Each course contributes to the GPA according to both its grade point and credit value.

### CGPA

The overall CGPA is calculated using the GPA and total credits of each completed semester.

\[
CGPA =
\frac{\sum(GPA_i \times Semester\ Credits_i)}
{\sum Semester\ Credits_i}
\]

The calculator retains the **exact GPA value internally** while performing the CGPA calculation. Rounding is applied only to the final displayed result.

For example:

```text
Exact CGPA = 9.3077
Displayed CGPA = 9.31
