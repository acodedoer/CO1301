// ballsboard.cpp: A program using the TL-Engine

#include <TL-Engine.h>	// TL-Engine include file and namespace
using namespace tle;
const float kgamespeed = 0.30;
float sphereSpeed = 1;


void main()
{

	// Create a 3D engine (using TLX engine here) and open a window for it
	I3DEngine* myEngine = New3DEngine(kTLX);
	myEngine->StartWindowed();

	// Add default folder for meshes and other media
	myEngine->AddMediaFolder("C:\\ProgramData\\TL-Engine\\Media");
	myEngine->AddMediaFolder("C:\\Users\\fahee\\Documents\\CO1301\\ballsboard\\Media");
	/**** Set up your scene here ****/

	string MouseWheelMovemnet;

	float testingSpeed = 1;
	float sphereSpeed = 1;



	IMesh* BoardMesh;
	IModel* Board;
	BoardMesh = myEngine->LoadMesh("board.x");
	Board = BoardMesh->CreateModel();
	Board->SetPosition(0, 0, 0);

	IMesh* floorMesh;
	IModel* floor;
	floorMesh = myEngine->LoadMesh("floor.x");
	floor = floorMesh->CreateModel();
	floor->SetPosition(0, -0.2, 0);

	ICamera* myCamera;
	myCamera = myEngine->CreateCamera(kManual);
	myCamera->SetPosition(0, 240, -240);
	myCamera->RotateLocalX(45);

	IMesh* sphere1Mesh;
	IModel* sphere1;
	sphere1Mesh = myEngine->LoadMesh("ball.x");
	sphere1 = sphere1Mesh->CreateModel();
	sphere1->SetPosition(125, 10, -125);

	IMesh* sphere2Mesh;
	IModel* sphere2;
	sphere2Mesh = myEngine->LoadMesh("ball.x");
	sphere2 = sphere2Mesh->CreateModel();
	sphere2->SetPosition(-125, 10, 75);

	bool sphere1position = true;
	bool sphere1position2 = true;
	bool sphere2position = true;
	bool sphere2position2 = true;


	// The main game loop, repeat until engine is stopped
	while (myEngine->IsRunning())
	{
		// Draw the scene
		myEngine->DrawScene();

		/**** Update your scene each frame here ****/

		if (sphere1position) {
			sphere1->MoveX(-kgamespeed);
			if (sphere1->GetX() >= 125) {
				sphere1position = false;

			}
		}
		else {
			sphere1->MoveX(kgamespeed);
			if (sphere1->GetX() <= -75) {
				sphere1position = false;

			}
		}
		if (sphere1position2)
		{
			sphere1->MoveZ(-kgamespeed);
			if (sphere1->GetZ() <= -125)
			{
				sphere1position = false;

			}



		}
		// sphere 2 code 
		if (sphere2position) {
			sphere2->MoveX(-kgamespeed);
			if (sphere2->GetX() >= 125) {
				sphere2position = false;

			}
		}
		else {
			sphere2->MoveX(-kgamespeed);
			if (sphere2->GetX() <= -125) {
				sphere2position = true;

			}
		}
		if (sphere2position2)
		{
			sphere2->MoveZ(-kgamespeed);
			if (sphere2->GetZ() <= -125)
			{
				sphere2position = false;

			}
		}
		int mouseMoveY = myEngine->GetMouseMovementY();

		if (mouseMoveY > 1)
		{
			sphereSpeed += (kgamespeed / 10);
		}
		else if (mouseMoveY < 1)
		{
			sphereSpeed -= (kgamespeed / 10);
		}

		if (myEngine->KeyHit(Key_Escape))
		{
			myEngine->Stop();
		}

	}

	// Delete the 3D engine now we are finished with it
	myEngine->Delete();
}