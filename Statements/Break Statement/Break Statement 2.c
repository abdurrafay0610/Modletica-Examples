

void while_example()
{
	bool condition = true;
	
	while(condition)
	{
		condition = false;
		break;
		condition = true; // dead code
	}
}