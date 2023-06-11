<?php
declare(strict_types=1);

namespace Application\Model;

use Laminas\Db\TableGateway\AbstractTableGateway;
use Laminas\Db\Adapter\Adapter;

class Location extends AbstractTableGateway {

    protected $adapter;
    protected $table = 'locations';

    public function __construct(Adapter $adapter) {
        $this->adapter = $adapter;
        $this->initialize();
    }
}