<?php
	session_start();

	// обрабока запроса выхода из учетной записи пользователя
	if($_POST['exit'])
	{
		if(isset($_SESSION['login']))
		{
			session_unset();
			session_destroy();
			echo "success";
		}
		else
		{
			echo "error";
		}
	}

	// Обработка запроса авторизации пользователя
	if($_POST['user'])
	{
		$user = json_decode($_POST['user']);
		$login = decryptVigener($user->login, $_SESSION["close_key"]);
		$password = decryptVigener($user->password, $_SESSION["close_key"]);

		if(!empty($login) && !empty($password) &&  (strlen($password) >= 6) )
		{
			$db = mysqli_connect("localhost", "root", "", "auto");
			if($db->connect_error)
			{
				die($db->connect_error);
			}

			createTableUsers($db);

			$query = mysqli_query($db, "SELECT * FROM users WHERE login = '$login'") or die(mysqli_error($db));
			if(mysqli_num_rows($query) == 1)
			{
				$row = mysqli_fetch_assoc($query);
				if($row['password'] == md5($password))
				{
					mysqli_close($db);
					$_SESSION["login"] = $login;
					echo "success";
				}
				else
				{
					echo "error";
				}	
			}
			else
			{
				echo "error";
			}
		}
	}

	// создание таблицы users если она еще не существует
	function createTableUsers($db) {
		$query = "CREATE TABLE IF NOT EXISTS users (
  			id int(11) NOT NULL AUTO_INCREMENT,
  			login varchar(100) NOT NULL UNIQUE,
  			password varchar(100) NOT NULL,
  			PRIMARY KEY (id)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

		mysqli_query($db, $query) or die(mysqli_error($db));
	}
	
	// Дешифрование методом Вижинера
	function decryptVigener($text, $key)
    {
        $alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
        $positionKey = 0;
        for ($i = 0; $i < strlen($text); $i++)
        {
            $text[$i] = $alphabet[(strpos($alphabet, $text[$i]) - strpos($alphabet, $key[$positionKey]) + strlen($alphabet)) % strlen($alphabet)];
            $positionKey = ($positionKey + 1) % strlen($key);
        }
        return $text;
    }
?>