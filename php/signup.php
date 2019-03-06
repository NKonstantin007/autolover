<?php
	session_start();	// старт сессии

	if($_POST['param'])
	{
		$param = json_decode($_POST['param']);
		$p = new Math_BigInteger($param->p);	
		$g = new Math_BigInteger($param->g);
		$A = new Math_BigInteger($param->A);
		
		$b = new Math_BigInteger(getRandomBigInteger(25));
		$B = $g->modPow($b, $p);
		$close_key = $A->modPow($b, $p)->toString();
		
		$_SESSION["close_key"] = $close_key;
		echo json_encode(array("B"=>$B->toString()));
	}

	// обработка запроса реuистрации пользователя
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
			if(mysqli_num_rows($query) == 0)
			{
				$password = md5($password);
				$query = mysqli_query($db, "INSERT INTO users (login, password) VALUES('$login', '$password')") or die(mysqli_error($db));
				mysqli_close($db);
				echo "success";
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