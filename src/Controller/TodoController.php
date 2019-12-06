<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Todo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TodoController extends AbstractController
{
    /**
     * @Route("/api/todo", name="get_all_todo", methods={"GET"})
     * @return JsonResponse
     */
    public function getTodos(): ?JsonResponse
    {
        $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
        $todos= $this->getDoctrine()
            ->getRepository(Todo::class)
            ->findAll();
        $serializedTodos = $serializer->serialize($todos, 'json');

        return JsonResponse::fromJsonString($serializedTodos);
    }

    /**
     * @Route("/api/todo", name="create_todo", methods={"POST"})
     * @param Request $request
     * @param ValidatorInterface $validator
     * @return Response
     */
    public function createTodo(Request $request, ValidatorInterface $validator): ?Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $todo = new Todo();
        $todo->setDescription($request->request->get('description'));
        $todo->setModifiedAt(new \DateTime());
        $todo->setCreatedAt(new \DateTime());

        //Validate todo object on properties
        $errors = $validator->validate($todo);
        if (count($errors) > 0) {
            return new Response((string) $errors, 500);
        }

        $entityManager->persist($todo);
        $entityManager->flush();

        return new Response('Saved new todo with id ' . $todo->getId());
    }

    /**
     * @Route("/api/todo/{id}", name="edit_todo", methods={"PUT"})
     * @param int $id
     * @param Request $request
     * @param ValidatorInterface $validator
     * @return Response
     */
    public function editTodo(int $id, Request $request, ValidatorInterface $validator): ?Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $todo = $entityManager->getRepository(Todo::class)->find($id);
        if (!$todo) {
            return new Response((string) 'No todo found for id ' . $id, 400);
        }
        $todo->setDescription($request->request->get('description'));
        $todo->setModifiedAt(new \DateTime());

        //Validate todo object on properties
        $errors = $validator->validate($todo);
        if (count($errors) > 0) {
            return new Response((string) $errors, 500);
        }

        $entityManager->persist($todo);
        $entityManager->flush();

        return new Response('Edited todo with id ' . $todo->getId());
    }

    /**
     * @Route("/api/todo/done/{id}", name="todo_done", methods={"PUT"}, requirements={"id"="\d+"})
     * @param int $id
     * @param boolean $done
     * @return Response
     */
    public function setTodoDone(int $id, $done = true): ?Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $todo = $entityManager->getRepository(Todo::class)->find($id);

        if (!$todo) {
            return new Response((string) 'No todo found for id ' . $id, 400);
        }

        $todo->setDone(!$todo->getDone());
        $todo->setModifiedAt(new \DateTime());
        $entityManager->flush();

        return new Response('Set todo with id ' . $id . ($todo->getDone() ? " done" : " not done"));
    }

    /**
     * @Route("/api/todo/{id}", name="remove_todo", methods={"DELETE"}, requirements={"id"="\d+"})
     * @param int $id
     * @return Response
     */
    public function removeTodo(int $id): ?Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $todo = $entityManager->getRepository(Todo::class)->find($id);

        if (!$todo) {
            return new Response((string) 'No todo found for id ' . $id, 400);
        }

        $entityManager->remove($todo);
        $entityManager->flush();

        return new Response('Todo with id ' . $id . ' is removed');
    }
}
