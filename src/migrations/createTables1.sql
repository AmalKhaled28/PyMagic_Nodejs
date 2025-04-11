USE py_magic;

CREATE TABLE feedbacks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    student_quiz_id INT,
    feedback_score INT, -- 1 to 5 (emoji scale)
    comment TEXT, -- Optional text-based comment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (student_quiz_id) REFERENCES student_quizzes(id)
);
-- -- Get-Content D:\PymagicBackend\src\migrations\createTables1.sql | mysql -u root -p pymagic