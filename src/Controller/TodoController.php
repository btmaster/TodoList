<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Todo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TodoController extends AbstractController
{
    /**
     * @Route("/api/todo", name="get_all_todo", methods={"GET"})
     * @return Symfony\Component\HttpFoundation\Response
     */
    public function getTodos()
    {
        $products = $this->getDoctrine()
        ->getRepository(Todo::class)
        ->findAll();
    }

    /**
     * @Route("/api/todo", name="create_todo", methods={"POST"})
     * @return Symfony\Component\HttpFoundation\Response
     */
    public function createTodo(Request $request)
    {
        var_dump($request->request);
        exit();
        $entityManager = $this->getDoctrine()->getManager();

        $todo = new Todo();
        $todo->setDescription($request->get('description'));
        $todo->setCreatedAt(new \DateTime());

        //Validate todo object on properties
        $errors = $validator->validate($todo);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }

        $entityManager->persist($todo);
        $entityManager->flush();

        return new Response('Saved new todo with id ' . $todo->getId());
    }

    /**
     * @Route("/api/todo/{id}", name="edit_todo", methods={"PUT"}, requirements={"id"="\d+"})
     * @param int $id
     * @param boolean $done
     * @return Symfony\Component\HttpFoundation\Response
     */
    public function editTodo(int $id, $done = true)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $todo = $entityManager->getRepository(Todo::class)->find($id);

        if (!$todo) {
            throw $this->createNotFoundException(
                'No todo found for id ' . $id
            );
        }

        $todo->setDone(!$todo->getDone());
        $entityManager->flush();

        return new Response('Set todo with id ' . $id . ($todo->getDone() ? " done" : " not done"));
    }

    /**
     * @Route("/api/todo/{id}", name="remove_todo", methods={"DELETE"}, requirements={"id"="\d+"})
     * @param int $id
     * @return Symfony\Component\HttpFoundation\Response
     */
    public function removeTodo(int $id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $todo = $entityManager->getRepository(Todo::class)->find($id);

        if (!$todo) {
            throw $this->createNotFoundException(
                'No todo found for id ' . $id
            );
        }

        $entityManager->remove($todo);
        $entityManager->flush();

        return new Response('Todo with id ' . $id . ' is removed');
    }
}
