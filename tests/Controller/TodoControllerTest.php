<?php

namespace App\Tests\Util;

use App\Controller\TodoController;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TodoControllerTest extends WebTestCase
{
    /**
     * Get id which is shared over the multiple functions.
     * @return int $id
     */
    protected function &getSharedId()
    {
        static $id = null;
        return $id;
    }

    /**
     * Test adding a new todo
     */
    public function testAddTodo()
    {
        $client = static::createClient();

        $client->request('POST', '/api/todo', ["description" => "test"]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Test adding a new todo with empty description
     */
    public function testEmptyDescriptionAddTodo()
    {
        $client = static::createClient();

        $client->request('POST', '/api/todo', ["description" => ""]);

        $this->assertEquals(500, $client->getResponse()->getStatusCode());
    }

    /**
     * Test getting a list of all todos
     */
    public function testShowTodos()
    {
        $client = static::createClient();

        $client->request('GET', '/api/todo');
        $result = json_decode($client->getResponse()->getContent());
        $id = &$this->getSharedId();
        $id = $result[0]->id;
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Test editing an existing todo
     */
    public function testEditTodo()
    {
        $client = static::createClient();
        $id = &$this->getSharedId();

        $client->request('PUT', '/api/todo/' . $id, ["description" => "test2"]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Test editing an existing todo with an empty description
     */
    public function testEmptyDescriptionEditTodo()
    {
        $client = static::createClient();

        $id = &$this->getSharedId();
        $client->request('PUT', '/api/todo/' . $id, ["description" => ""]);
        $this->assertEquals(500, $client->getResponse()->getStatusCode());
    }

    /**
     * Test editing a NON existing todo with wrong id
     */
    public function testWrongIdEditDescription()
    {
        $client = static::createClient();

        $client->request('PUT', '/api/todo/1231425', ["description" => ""]);

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    /**
     * Test editing an existing todo to status done or not done
     */
    public function testEditDone()
    {
        $client = static::createClient();
        $id = &$this->getSharedId();
        $client->request('PUT', '/api/todo/done/' . $id);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Test editing a NON existing todo to status done or not done with wrong id
     */
    public function testWrongIdEditDone()
    {
        $client = static::createClient();

        $client->request('PUT', '/api/todo/done/1231425');

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    /**
     * Test removing an existing
     */
    public function testRemoveTodo()
    {
        $client = static::createClient();
        $id = &$this->getSharedId();
        $client->request('DELETE', '/api/todo/' . $id);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Test removing a NON existing with wrong id
     */
    public function testWrongIdRemoveTodo()
    {
        $client = static::createClient();

        $client->request('DELETE', '/api/todo/1231425', ["description" => ""]);

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }
}
