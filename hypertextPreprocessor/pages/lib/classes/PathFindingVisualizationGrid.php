<?php

class PathFindingVisualizationGrid
{
    private const TILE_SIZE = 50;
    private const NAV_HEIGHT = 64;
    private const PADDING = 32;


    private $columns;
    private $rows;

    public function __construct($width, $height)
    {
        $this->columns = ($width - $this::PADDING) / self::TILE_SIZE;
        $this->rows = ($height - $this::NAV_HEIGHT - $this::PADDING) / self::TILE_SIZE;
    }

    #region Getters

    public function getFlooredColumns()
    {
        return floor($this->columns);
    }

    public function getFlooredRows()
    {
        return floor($this->rows);
    }

    #endregion

    public function getQuantity()
    {
        return $this->getFlooredColumns() * $this->getFlooredRows();
    }
}
