<?php
include "init.php";
include "$tpl/header.php";
?>

<style>
.alert-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    animation: fadeOut 5s forwards;
    animation-delay: 3s;
}

@keyframes fadeOut {
    to {
        opacity: 0;
        visibility: hidden;
    }
}
</style>

<div class="wrapper">
    <nav class="nav">
      <div class="nav-logo">
        <p>ManGO .</p>
      </div>
      <div class="nav-menu" id="navMenu">
        <ul>
          <li><a href="#" class="link active">Home</a></li>
          <li><a href="#" class="link">Blog</a></li>
          <li><a href="#" class="link">Services</a></li>
          <li><a href="#" class="link">About</a></li>
        </ul>
      </div>
      <div class="nav-button"> 
        <button class="btn white-btn" id="loginBtn" onclick="login()">Sign In</button>
        <button class="btn" id="registerBtn" onclick="register()">Sign Up</button>
      </div>
      <div class="nav-menu-btn">
        <i class="bx bx-menu" onclick="myMenuFunction()"></i>
      </div>
    </nav>
    
    <!-- Form box -->
    <div class="form-box">
      <!-- Login form -->
      <?php
      if(isset($_POST["login"])){
          $email = $_POST["email"];
          $password = $_POST["password"];
          require_once "connect.php";
          
          $sql = "SELECT * FROM users WHERE email = ?";
          $stmt = $con->prepare($sql);
          $stmt->execute([$email]);
          $user = $stmt->fetch(PDO::FETCH_ASSOC);
          
          if($user){
            if(password_verify($password, $user["passwd"])){
                session_start();
                $_SESSION['login_id'] = $user['id']; // Stocke l'ID utilisateur
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['loggedin'] = true;
                
                header("Location: principal.php");
                exit(); // Important pour éviter toute exécution supplémentaire
            } else {
                echo "<div class='alert alert-danger'>Password does not match</div>";
            }
        }
      }
      ?>
      
      <form class="login-container" id="login" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
        <div class="top">
          <span>Don't have an account? <a href="#" onclick="register()">Sign Up</a></span>
          <header>Login</header>
        </div>
        <div class="input-box">
          <input type="email" class="input-field" placeholder="Enter Email:" name="email">
          <i class="bx bx-user"></i>
        </div>
        <div class="input-box">
          <input type="password" class="input-field" placeholder="Password" name="password">
          <i class="bx bx-lock-alt"></i>
        </div>
        <div class="input-box">
          <input type="submit" class="submit" value="Login" name="login">
        </div>
        <div class="two-col">
          <div class="one">
            <input type="checkbox" id="login-check">
            <label for="login-check"> Remember Me</label>
          </div>
          <div class="two">
            <label><a href="#">Forgot password?</a></label>
          </div>
        </div>
      </form>
     
      <!-- Registration form -->
      <script>
        // Function to hide error messages when clicking anywhere
        document.addEventListener('DOMContentLoaded', function() {
            // Hide messages when clicking
            document.addEventListener('click', function() {
                const errorMessages = document.querySelectorAll('.alert-danger, .alert-success');
                errorMessages.forEach(message => {
                    message.style.display = 'none';
                });
            });
            
            // Auto-hide success messages after 5 seconds
            const successMessages = document.querySelectorAll('.alert-success');
            successMessages.forEach(message => {
                setTimeout(() => {
                    message.style.display = 'none';
                }, 5000);
            });
        });
      </script>

      <?php
      if(isset($_POST["submit"])){
          $firstname = $_POST["Firstname"];
          $lastname = $_POST["Lastname"];
          $email = $_POST["Email"];
          $password = $_POST["Password"];
          $errors = array();
          
          if(empty($firstname) || empty($lastname) || empty($email) || empty($password)){
              array_push($errors, "All fields are required");
          }
          if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
              array_push($errors, "Email is not valid");
          }
          if(strlen($password)<8){
              array_push($errors, "Password must be at least 8 characters long");
          }
          
          if(count($errors)>0){
              echo '<div id="error-container" class="alert-message">';
              foreach($errors as $error){
                  echo "<div class='alert alert-danger'>$error</div>";
              }
              echo '</div>';
          } else {
              try {
                  // Hash the password
                  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                  
                  // Combine first and last name
                  $fullname = $firstname . ' ' . $lastname;
                  
                  // Current date for registration
                  $registrationDate = date('Y-m-d H:i:s');
                  
                  $sql = "INSERT INTO users (nom, email, passwd, dateInscription, status) 
                          VALUES (:nom, :email, :passwd, :dateInscription, :status)";
                  
                  $stmt = $con->prepare($sql);
                  $stmt->execute([
                      ':nom' => $fullname,
                      ':email' => $email,
                      ':passwd' => $hashedPassword,
                      ':dateInscription' => $registrationDate,
                      ':status' => 'active'
                  ]);
                  
                  echo "<div class='alert alert-success alert-message'>You are registered successfully.</div>";
                  
              } catch(PDOException $e) {
                  echo "<div class='alert alert-danger alert-message'>Registration failed: " . $e->getMessage() . "</div>";
              }
          }                     
      }
      ?>

      <form class="register-container" id="register" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
        <div class="top">
          <span>Have an account? <a href="#" onclick="login()">Login</a></span>
          <header>Sign Up</header>
        </div>
        <div class="two-forms">
          <div class="input-box">
            <input type="text" class="input-field" placeholder="Firstname" name="Firstname">
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box">
            <input type="text" class="input-field" placeholder="Lastname" name="Lastname">
            <i class="bx bx-user"></i>
          </div>
        </div>
        <div class="input-box">
          <input type="text" class="input-field" placeholder="Email" name="Email">
          <i class="bx bx-envelope"></i>
        </div>
        <div class="input-box">
          <input type="password" class="input-field" placeholder="Password" name="Password">
          <i class="bx bx-lock-alt"></i>
        </div>
        <div class="input-box">
          <input type="submit" class="submit" value="Register" name="submit">
        </div>
        <div class="two-col">
          <div class="one">
            <input type="checkbox" id="register-check">
            <label for="register-check"> Remember Me</label>
          </div>
          <div class="two">
            <label><a href="#">Terms & conditions</a></label>
          </div>
        </div>
      </form>
    </div>
  </div>

<?php include "$tpl/footer.php"; ?>