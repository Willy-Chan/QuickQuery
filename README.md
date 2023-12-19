# QuickQuery Automated Survey Maker

## Overview
This app essentially automates the creation of multi-choice reading assessments from CSV data. Users can upload a CSV file like [this sample](https://github.com/Willy-Chan/QuickQuery/tree/main/src/assets), and the app will generate a complete assessment based on the provided questions. The app identifies the "target" column as the correct answer and auto-fills three additional distractor options.

## Demo
https://github.com/Willy-Chan/QuickQuery/assets/106504264/7379d173-5910-4f06-9e99-20632a2d77eb


## Images
![image](https://github.com/Willy-Chan/QuickQuery/assets/106504264/e13ba930-3618-4ddb-b6a1-d17dccd967c1)
![image](https://github.com/Willy-Chan/QuickQuery/assets/106504264/e13b5abb-ebc5-4f74-bbb3-0f32e33d33f6)
![image](https://github.com/Willy-Chan/QuickQuery/assets/106504264/eb3d7765-61d1-49d6-a89b-06cd096bcaed)
![image](https://github.com/Willy-Chan/QuickQuery/assets/106504264/994335dc-4d30-4b86-a383-0fdd41f06760)


## Motivation
The motivation behind SurveySculptor is to streamline and modernize the process of creating multi-choice reading assessments. A lot of the existing ones on the internet aren't very customizable and require users to learn an entire clunky UI, while this is something that is made in React and, being open-source, can be freely modified to fit any need. Traditionally, such assessments require significant manual effort to design, format, and validate. This app addresses these challenges by offering a generalizable, modular, and intuitive solution. Its clean and simple interface ensures a hassle-free experience for educators and professionals alike, making the creation of assessments more efficient and user-friendly.

## Key Features
- **CSV Upload:** Easily upload your CSV file containing questions and answers.
- **Automated Assessment Creation:** The app automatically generates a complete assessment, identifying the correct answer and creating distractor options.
- **Intuitive Interface:** Designed with user experience in mind, making it straightforward and easy to use.
- **Modular Design:** Flexibility to cater to a wide range of assessment requirements.

## Notes on use
- The separate "survey" blocks are determined by the presence of empty lines that exist between rows in the CSV file. This can be modified depending on the specifications of your questions.
- Once the file is uploaded, the flow is visualized automatically and individual questions can be modified by clicking on the block card.
- "Deploying" launches a mini firebase-powered web app within the iframe, which allows you to see a preview of the app. The default is set to the ROAR theme (as that is the intended use case of this particular repo).

## License
This project is licensed under the [MIT License](LICENSE.md).
