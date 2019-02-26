<?php
	include('../libs/php/BigInteger.php');
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

	// обрабтка запроса, для проверки авторизации пользователя
	if($_GET['login'])
	{
		if(isset($_SESSION["login"]))
		{			
			echo $_SESSION["login"];
		}
		else
		{
			echo "";
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
			$query = mysqli_query($db, "SELECT * FROM users WHERE login = '$login'");
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

	function getRandomBigInteger($rank) 
	{
        $res = "" + rand(1, 9);
        for ($i = 1; $i < $rank; $i++) 
		{
            $res = $res + rand(0, 9);
        }
        return $res;
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