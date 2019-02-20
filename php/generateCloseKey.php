<?php
	include('../libs/php/BigInteger.php');
	session_start();

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