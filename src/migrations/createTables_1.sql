USE pymagic;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP,
    earned_points INT,
    game_level INT,
    parent_email VARCHAR(255) UNIQUE,
    age INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motivations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT,
    score_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answer_motivation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT,
    answer_type ENUM('correct', 'wrong'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255),
    image VARCHAR(255),
    required_points INT
);

CREATE TABLE achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    reward_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reward_id) REFERENCES rewards(id)
);

CREATE TABLE chatbot (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    prompt TEXT,
    answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE units (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    unit_id INT,
    title VARCHAR(255),
    description TEXT,
    flash_card TEXT,
    video_url TEXT,
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
);

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT,
    question TEXT,
    type ENUM('multiple_choice', 'true_false'),
    options JSON,
    correct_answer TEXT,
    hint TEXT,
    level ENUM('easy', 'medium', 'hard'),
    points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE student_quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT,
    unit_id INT,
    user_id INT,
    is_passed BOOLEAN,
    score INT,
    earned_points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (unit_id) REFERENCES units(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE student_quiz_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    quiz_id INT,
    answer TEXT,
    is_correct BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (quiz_id) REFERENCES student_quizzes(id)
);


CREATE TABLE assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('face', 'brow', 'eye', 'hairstyle', 'headdress', 'lip', 'nose') NOT NULL,
    name VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    asset_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    face VARCHAR(255),
    brow VARCHAR(255),
    eye VARCHAR(255),
    hairstyle VARCHAR(255),
    lip VARCHAR(255),
    nose VARCHAR(255),
    headdress VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- -- Get-Content D:\PymagicBackend\src\migrations\createTables_1.sql | mysql -u root -p pymagic