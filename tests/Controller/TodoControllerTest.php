<?php

namespace App\Tests\Util;

use App\Controller\TodoController;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TodoControllerTest extends WebTestCase
{
    protected function &getSharedId()
    {
        static $id = null;
        return $id;
    }

    public function testAddTodo()
    {
        $client = static::createClient();

        $client->request('POST', '/api/todo', ["description" => "test"]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testEmptyDescriptionAddTodo()
    {
        $client = static::createClient();

        $client->request('POST', '/api/todo', ["description" => ""]);

        $this->assertEquals(500, $client->getResponse()->getStatusCode());
    }

    public function testShowTodos()
    {
        $client = static::createClient();

        $client->request('GET', '/api/todo');
        $result = json_decode($client->getResponse()->getContent());
        $id = &$this->getSharedId();
        $id = $result[0]->id;
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testEditTodo()
    {
        $client = static::createClient();
        $id = &$this->getSharedId();

        $client->request('PUT', '/api/todo/' . $id, ["description" => "test2"]);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testEmptyDescriptionEditTodo()
    {
        $client = static::createClient();

        $id = &$this->getSharedId();
        $client->request('POST', '/api/todo/' . $id, ["description" => ""]);
        var_dump($client->getResponse());exit();
        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    public function testWrongIdEditDescription()
    {
        $client = static::createClient();

        $client->request('PUT', '/api/todo/1231425', ["description" => ""]);

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    public function testEditDone()
    {
        $client = static::createClient();
        $id = &$this->getSharedId();
        $client->request('PUT', '/api/todo/done/' . $id);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testWrongIdEditDone()
    {
        $client = static::createClient();

        $client->request('PUT', '/api/todo/done/1231425');

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    public function testRemoveTodo()
    {
        $client = static::createClient();
        $id = &$this->getSharedId();
        $client->request('DELETE', '/api/todo/' . $id);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testWrongIdRemoveTodo()
    {
        $client = static::createClient();

        $client->request('DELETE', '/api/todo/1231425', ["description" => ""]);

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }
}
